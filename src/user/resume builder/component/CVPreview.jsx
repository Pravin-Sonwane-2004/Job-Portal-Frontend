import React, { forwardRef } from 'react'
import CVTemplateModern from './CVTemplateModern'
import CVTemplateClassic from './CVTemplateClassic'
import CVTemplateMinimal from './CVTemplateMinimal'

const CVPreview = forwardRef(({ cv, colorScheme, style, template = 'modern' }, ref) => {
  // Choose template based on prop
  if (template === 'classic') {
    return <CVTemplateClassic ref={ref} cv={cv} colorScheme={colorScheme} style={style} />
  }
  if (template === 'minimal') {
    return <CVTemplateMinimal ref={ref} cv={cv} colorScheme={colorScheme} style={style} />
  }
  // Default to modern
  return <CVTemplateModern ref={ref} cv={cv} colorScheme={colorScheme} style={style} />
})

export default CVPreview
