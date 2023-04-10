import * as esbuild from "esbuild";
import * as path from "path";

const funcs = ["FuncAlertToTeams"];

for (const func of funcs) {
  await esbuild.build({
    bundle: true,
    entryPoints: [path.join(func, "index.ts")],
    platform: "node",
    outdir: path.join("dist", func),
    sourcemap: true,
  });
}
