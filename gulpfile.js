// const { src, dest } = require('gulp')
import pkg from "gulp"
const { src, dest } = pkg

function copyFramework() {
    return src([
        'public/**',
        '!public/*.*',
        '!public/media/**',
        '!public/**/images/**',
        '!public/framework/frontend/comand-component-library/**'
    ])
        .pipe(dest('dist'))
}

export default copyFramework
