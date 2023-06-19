export const print = (msg: string, ...args: any[]) => {
  if (!print.isOpen) return
  console.log(
    `%c${msg}`, 
    'background:#55efc4 ; padding: 2px 8px; border-radius: 3px;  color: #000')
  args && console.log(...args)
}

print.info = (msg: string, ...args: any[]) => {
  if (!print.isOpen) return
  console.log(
    `%c${msg}`,
    'background:#fdcb6e ; padding: 2px 8px; border-radius: 3px;  color: #000')
  args && console.log(...args)
}

print.error = (msg: string, ...args: any[]) => {
  if (!print.isOpen) return
  console.log(
    `%c${msg}`,
    'background:#ff7675 ; padding: 2px 8px; border-radius: 3px;  color: #000')
  args && console.log(...args)
}

print.stress = (msg: string, ...args: any[]) => {
  if (!print.isOpen) return
  console.log(
    `%c${msg}`,
    'background:#a29bfe ; padding: 2px 8px; border-radius: 3px;  color: #000')
  args && console.log(...args)
}

print.tip = (msg: string, ...args: any[]) => {
  if (!print.isOpen) return
  console.log(
    `%c${msg}`,
    'background:#81ecec ; padding: 2px 8px; border-radius: 3px;  color: #000')
  args && console.log(...args)
}

print.isOpen = true

