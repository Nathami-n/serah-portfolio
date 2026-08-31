import { redirect } from "react-router";

/**
 * /albums -> /music, permanently.
 *
 * The old site used /albums, and that URL is in press coverage and shared links
 * we do not control. A 301 keeps that traffic and passes the search ranking
 * across rather than dropping it into a 404.
 */
export function loader() {
  return redirect("/music", 301);
}
