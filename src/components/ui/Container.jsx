export default function Container({ as: Component = 'div', className = '', children }) {
  const classes = ['mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
}
