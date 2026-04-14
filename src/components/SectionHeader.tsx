type SectionHeaderProps = {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
}: SectionHeaderProps) {
  const titleColor = tone === 'light' ? 'text-white' : 'text-carbon-950'
  const introColor = tone === 'light' ? 'text-steel-300' : 'text-carbon-800'
  const eyebrowColor = tone === 'light' ? 'text-signal-teal' : 'text-carbon-800'

  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className={`mb-4 text-sm font-semibold uppercase ${eyebrowColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-3xl font-semibold leading-tight md:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {intro ? <p className={`mt-5 text-base leading-7 ${introColor}`}>{intro}</p> : null}
    </div>
  )
}
