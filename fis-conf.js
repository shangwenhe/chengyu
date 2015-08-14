fis.hook('module', {
    mod: 'commonJs'
}).set('namespace','chengyu');

fis
    .media('prod')
    .match('*.js', {
        optimizer: fis.plugin('uglify-js'),
        useHash: true
    })
    .match('/static/{page,lib}/*.js', {
        isMod: true,
        release: 'static/$0',
        packTo: '/static/pkg/lib.js'
    })
    .match('/static/mod.js', {
        isMod: false,
        useHash: false
    })
    .match('*.{css,less}', {
        parser: fis.plugin('less'),
        optimizer: fis.plugin('clean-css'),
        useHash: true
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('::package',{
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        postpackager: fis.plugin('loader', {
            resourceType: 'commonJs',
            useInlineMap: true // 资源映射表内嵌
        })
    })
