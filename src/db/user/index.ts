export default interface User {
  id?: number; // autogen
  name: string;
  email: string;
  locale: "en" | "pt";
  timezone: string;
  profile_picture: string;
}
