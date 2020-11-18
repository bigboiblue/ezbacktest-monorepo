module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/preset-env", {
                targets: ">0.5%, last 2 versions, not dead"
            }
        ],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ];
    const plugins = [
        "transform-class-properties"
    ];
    return {
        presets,
        plugins
    };
}