module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://teach.test",
                changeOrigin: true
            }
        }
    }
};
