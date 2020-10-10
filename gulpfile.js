const { src, dest } = require('gulp')

function copyFramework() {
    return src([
        'public/**',
        '!public/*.*',
        '!public/media/**',
        '!public/**/images/**',
        '!public/framework/frontend/ui-kit/**'
    ])
        .pipe(dest('dist'))
}

exports.default = copyFramework
