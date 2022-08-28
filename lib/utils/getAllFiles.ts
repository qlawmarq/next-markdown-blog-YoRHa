import fs from 'fs'
import path from 'path'


const searchFilesOfDirectory = (directory: string) => {
  let files: string[] = []
  const filesInDirectory = fs.readdirSync(directory)
  for (const file of filesInDirectory) {
    const absolutePath = path.join(directory, file)
    if (fs.statSync(absolutePath).isDirectory()) {
      console.warn("Folder/directory exists in target directory. This will be ignored.")
    } else {
      files.push(absolutePath)
    }
  }
  return files
}


export default searchFilesOfDirectory
