import { defineConfig } from 'vite';
import { splitVendorChunkPlugin } from 'vite';
import autoprefixer from 'autoprefixer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import cssDeclarationSorter from 'css-declaration-sorter';
import postcssNormalizeCharset from 'postcss-normalize-charset';
import vitePluginPugStatic from "@macropygia/vite-plugin-pug-static";

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        home: 'src/index.pug'
      },
      output: {
        entryFileNames: `assets/js/bundle.js`,
        chunkFileNames: `assets/js/[name].js`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          //ビルド時のCSS名を明記してコントロールする
          if(extType === 'css') {
            return `assets/css/style.css`; // `style.[hash].css`;
          }
          return `assets/[name][extname]`;
        },
      }
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        postcssSortMediaQueries,
        cssDeclarationSorter({order:'smacss'}),
        postcssNormalizeCharset,
      ]
    },
  },
  plugins: [
    splitVendorChunkPlugin(),
    vitePluginPugStatic({
      buildOptions: { basedir: "src" },//ルートディレクトリ
      serveOptions: { basedir: "src" }//ルートディレクトリ
    })
  ]
});