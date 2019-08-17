export function titleCase (string) {
  return string
    .split('-')
    .map((s) => {
      const [ first, ...rest ] = s;
      return `${first.toUpperCase()}${rest.join('')}`;
    })
    .join(' ');
}
