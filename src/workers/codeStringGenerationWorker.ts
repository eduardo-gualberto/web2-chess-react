export default function codeStringGenerationWorker() : string {
    const numberOfChars = 7
    const code = Math.random().toString(36).toUpperCase().substring(2, 2 + numberOfChars)
    return code
}