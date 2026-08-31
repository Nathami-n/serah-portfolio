import { redirect } from "react-router";

/**
 * /contacts -> /#booking, permanently.
 *
 * The old site had a /contacts page built around an EmailJS form. Booking now
 * runs through WhatsApp from the home page's call to action, so the old URL
 * lands there instead of 404ing.
 */
export function loader() {
  return redirect("/", 301);
}
