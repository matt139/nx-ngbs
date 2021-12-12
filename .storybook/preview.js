import { setCompodocJson } from '@storybook/addon-docs/angular'
import docJson from '../documentation.json'

export const parameters = {
  angularLegacyRendering: true,
}

setCompodocJson(docJson)
