import {defineConfig} from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";
import reactJsx from "vite-react-jsx";
import releasesPlugin from "./vite-plugins/releases";
import mdx from "vite-plugin-mdx";
import remarkPrism from "remark-prism";
import {remarkMdxImages} from "remark-mdx-images";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const remarkFrontmatter = await import("remark-frontmatter");

  const options = {
    // See https://mdxjs.com/advanced/plugins
    remarkPlugins: [remarkMdxImages, remarkFrontmatter, remarkPrism],
    rehypePlugins: [
      (await import("rehype-slug")).default,
      (await import("rehype-autolink-headings")).default,
    ],
  };
  return {
    plugins: [
      reactRefresh(),
      tsconfigPaths(),
      reactJsx(),
      releasesPlugin(),
      mdx(options),
    ],
    build: {
      outDir: "../dist/public",
      emptyOutDir: false,
    },
    define: {
      "process.env.THORIUMSIM_CLIENT_ID": `"01FM3JNPNP3GFAXYR22Y7F9XAJ"`,
      "process.env.THORIUMSIM_URL": `"https://thoriumsim.com"`,
    },
    base: "/",
    server: {
      open: true,
      fs: {
        strict: false,

        // Allow serving files from one level up to the project root
        allow: [".."],
      },
      proxy: {
        "/netSend": "http://localhost:3001",
        "/netRequest": "http://localhost:3001",
        "/cardRequest": "http://localhost:3001",
        "/plugins": "http://localhost:3001",
      },
    },
  };
});
