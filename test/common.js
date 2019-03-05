
import once from "once"
import { spawn } from "child_process"

export const bin = require.resolve("../dist/bin/reacli.js")

export let nodeBin = process.env.npm_node_execpath || process.env.NODE || process.execPath

const common = (cmd, opts, cb) => {
  opts = { ...opts }
  cb = once(cb)
  cmd = [bin, ...cmd]

  opts.env = opts.env || process.env

  if (opts.env._storage) opts.env = { ...opts.env._storage }

  if (!opts.env.npm_config_send_metrics) {
    opts.env.npm_config_send_metrics = "false"
  }

  if (!opts.env.npm_config_audit) {
    opts.env.npm_config_audit = "false"
  }

  nodeBin = opts.nodeExecPath || nodeBin

  let stdout = ""
  let stderr = ""
  const child = spawn(nodeBin, cmd, opts)

  if (child.stderr) {
    child.stderr.on("data", (chunk) => {
      stderr += chunk
    })
  }

  if (child.stdout) {
    child.stdout.on("data", (chunk) => {
      stdout += chunk
    })
  }

  child.on("error", cb)

  child.on("close", (code) => {
    cb(null, code, stdout, stderr)
  })

  return child
}

export default common