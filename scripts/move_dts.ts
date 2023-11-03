// move package/dist/**/*.d.ts to package/es/**/*.d.ts and package/lib/**/*.d.ts
import path from 'node:path'
import process from 'node:process';
import fs from 'node:fs/promises'
import { Dirent } from 'node:fs';
import chalk from 'chalk'

run()

async function run() {
    try {
        const workPath = process.cwd()
        const tsFile = await fs.readFile(path.join(workPath, 'tsconfig.json'), { encoding: 'utf-8' })
        const tsOutDir = JSON.parse(tsFile).compilerOptions.outDir
        const sourcePath = path.join(workPath, tsOutDir)
        const targetsPath = ['es', 'lib'].map(format => path.join(workPath, format));
        const sourceFiles = await fs.readdir(sourcePath, { withFileTypes: true })
        await Promise.all(sourceFiles.map(fileOrDir => copyFile(fileOrDir, sourcePath, targetsPath)))
        console.log(chalk.green('move dts file success'))
    } catch (error) {
        console.error(chalk.red('move dts error:'), error)
    }
}

async function copyFile(fileOrDir: Dirent, sourcePath: string, targetsPath: string[]) {
    const current = path.join(sourcePath, fileOrDir.name)
    const fstats = await fs.stat(current)
    const queue: Promise<void>[] = []
    if (fstats.isFile()) {
        queue.concat(targetsPath.map(tp => fs.copyFile(current, path.join(tp, fileOrDir.name))))
    } else if (fstats.isDirectory()) {
        queue.concat(targetsPath.map(tp => fs.cp(current, path.join(tp, fileOrDir.name), { recursive: true, filter: src => !/__tests?__/.test(src) })))
    }
    return Promise.all(queue)
}
