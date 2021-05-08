const fs = require('fs')
const camelCase = require('camelcase')

const iconDir = './src/assets/icons'

const template = (importContent, dataContent) => `
<!-- Dynamically generated file by scripts/import-svg-icons.js -->
<template>
  <svg-icon :data="svg[$props.name]" original></svg-icon>
</template>

<script>
  ${importContent}
  export default {
    name: 'Icon',
    props: {
      name: { type: String },
    },
    data() {
      return {
        svg: {
          ${dataContent}
        },
      }
    },
  }
</script>
`
const importTemplate = (name, camelCaseName) =>
  `import ${camelCaseName} from '@/assets/icons/${name}.svg';\n`
const dataTemplate = (name, camelCaseName) => `'${name}':${camelCaseName},\n`

let importContent = '',
  dataContent = ''

fs.readdirSync(iconDir).forEach((file) => {
  const name = file.match(/(.*)\.svg$/)[1]
  const camelCaseName = camelCase(name)
  importContent += importTemplate(name, camelCaseName)
  dataContent += dataTemplate(name, camelCaseName)
})

const vueContent = template(importContent, dataContent)

fs.writeFileSync('src/components/Icon.vue', vueContent)
