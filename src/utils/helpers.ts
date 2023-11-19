export function uuid(): string {
  const currentDate = new Date()

  // Generate a random UUID
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

  // Replace '4' with the current timestamp in hexadecimal
  const timestampHex = (currentDate.getTime() / 1000).toString(16).split('.')[0]
  const uuidWithTimestamp = uuid.replace(/4/, timestampHex)

  return uuidWithTimestamp
}
