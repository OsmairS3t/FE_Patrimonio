type Props = HTMLInputElement{
  name: string
}

export function InputDefault({ name, ...rest }: Props) {
  return <input name={name} {...rest} />
}
