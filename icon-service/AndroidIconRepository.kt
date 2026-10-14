package com.leego.icons

import android.content.Context
import android.os.Looper
import android.util.AtomicFile
import org.json.JSONObject
import java.io.File
import java.io.ByteArrayOutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.security.MessageDigest

/** Call on a worker thread. This repository downloads image data only, never remote executable code. */
class AndroidIconRepository(context: Context) {
    private val root = File(context.filesDir, "leego-icons-v1").apply { mkdirs() }
    private val origin = "https://smalltypeui.qiaokiai.com"
    private val base = "/skills/leego-design-ui/site/icon-api/v1"
    data class Snapshot(val catalog: JSONObject, val fromCache: Boolean)
    private fun sha(bytes: ByteArray) = MessageDigest.getInstance("SHA-256").digest(bytes).joinToString("") { "%02x".format(it) }
    private fun worker() = check(Looper.myLooper() != Looper.getMainLooper()) { "Network/cache IO must not run on the main thread" }
    private fun download(path: String): ByteArray {
        require(path.startsWith("$base/"))
        val connection = URL(origin + path).openConnection() as HttpURLConnection
        connection.connectTimeout = 8000; connection.readTimeout = 8000
        connection.instanceFollowRedirects = false
        try {
            check(connection.responseCode == 200) { "Icon HTTP ${connection.responseCode}" }
            return connection.inputStream.use { input ->
                val output = ByteArrayOutputStream(); val buffer = ByteArray(8192)
                while (true) { val size = input.read(buffer); if (size < 0) break
                    check(output.size() + size <= 16 * 1024 * 1024) { "Image exceeds supported size" }
                    output.write(buffer, 0, size)
                }
                output.toByteArray()
            }
        } finally { connection.disconnect() }
    }
    private fun save(file: File, bytes: ByteArray) {
        val atomic = AtomicFile(file); val output = atomic.startWrite()
        try { output.write(bytes); atomic.finishWrite(output) } catch (e: Exception) { atomic.failWrite(output); throw e }
    }
    fun snapshot(pinnedVersion: String? = null): Snapshot {
        worker(); require(pinnedVersion == null || pinnedVersion.matches(Regex("\\d+\\.\\d+\\.\\d+")))
        val cache = AtomicFile(File(root, "catalog-${pinnedVersion ?: "stable"}.json"))
        try {
            val pointer = if (pinnedVersion == null) JSONObject(String(download("$base/channels/stable.json"), Charsets.UTF_8)) else null
            val version = pinnedVersion ?: pointer!!.getString("version")
            require(version.matches(Regex("\\d+\\.\\d+\\.\\d+")))
            val path = "$base/releases/$version.json"
            if (pointer != null) require(pointer.getInt("schemaVersion") == 1 && pointer.getString("catalog") == path)
            val bytes = download(path)
            if (pointer != null) check(sha(bytes) == pointer.getString("sha256"))
            val catalog = JSONObject(String(bytes, Charsets.UTF_8))
            require(catalog.getInt("schemaVersion") == 1 && catalog.getString("base") == base && catalog.getString("version") == version)
            val envelope = JSONObject().put("text", String(bytes, Charsets.UTF_8)).put("sha256", sha(bytes))
            save(cache.baseFile, envelope.toString().toByteArray(Charsets.UTF_8))
            return Snapshot(catalog, false)
        } catch (e: Exception) {
            try {
                val envelope = JSONObject(String(cache.readFully(), Charsets.UTF_8))
                val bytes = envelope.getString("text").toByteArray(Charsets.UTF_8)
                check(sha(bytes) == envelope.getString("sha256"))
                val catalog = JSONObject(String(bytes, Charsets.UTF_8))
                require(catalog.getInt("schemaVersion") == 1 && catalog.getString("base") == base)
                if (pinnedVersion != null) require(catalog.getString("version") == pinnedVersion)
                return Snapshot(catalog, true)
            } catch (_: Exception) { throw e }
        }
    }
    fun image(snapshot: Snapshot, id: String, variant: String? = null): File {
        worker()
        val entries = snapshot.catalog.getJSONArray("entries")
        val entry = (0 until entries.length()).map { entries.getJSONObject(it) }.firstOrNull { it.getString("id") == id }
            ?: error("Unknown icon: $id")
        require(entry.getString("rights") == "project-reuse") { "Reference-only asset" }
        val selected = variant ?: entry.getString("defaultVariant")
        require(selected != "animated") { "SMIL is not an Android animation; use static or a reviewed native implementation" }
        val asset = entry.getJSONObject("variants").getJSONObject(selected)
        val hash = asset.getString("sha256"); val format = asset.getString("format")
        require(hash.matches(Regex("[a-f0-9]{64}")) && format in listOf("svg", "png", "webp"))
        val path = "$base/assets/$hash.$format"; require(asset.getString("url") == path)
        val file = File(root, "$hash.$format")
        val cached = try { AtomicFile(file).readFully() } catch (_: Exception) { null }
        if (cached != null && sha(cached) == hash) return file
        val bytes = download(path); check(sha(bytes) == hash) { "Asset integrity mismatch" }
        save(file, bytes)
        return file
    }
}
