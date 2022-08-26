import fs from 'fs'
import path from 'path'
let files: string[] = []

const searchFileRecursive = (directory: string) => {
  const filesInDirectory = fs.readdirSync(directory)
  for (const file of filesInDirectory) {
    const absolutePath = path.join(directory, file)
    if (fs.statSync(absolutePath).isDirectory()) {
      searchFileRecursive(absolutePath)
    } else {
      files.push(absolutePath)
    }
  }
  return files
}

const getAllFilesRecursively = (directory: string) => {
  files = []
  searchFileRecursive(directory)
  return files
}

export default getAllFilesRecursively
