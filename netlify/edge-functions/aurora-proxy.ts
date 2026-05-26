import type { Context } from "https://edge.netlify.com/";

const FRAMER_ORIGIN = "https://laurenyip.framer.website";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  if (!url.pathname.startsWith("/aurora")) {
    return;
  }

  const framerUrl = new URL(url.pathname + url.search, FRAMER_ORIGIN);
  return context.rewrite(framerUrl.toString());
};

export const config = {
  path: "/aurora",
};
