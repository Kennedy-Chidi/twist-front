export default function ({ store, redirect, route }) {
  if (route.path.includes("admin") || route.path.includes("dashboard")) {
    return;
  }
  if (!store.state.auth.loggedIn) {
    const path = route.name;
    if (path.includes("admin") || path.includes("dashboard")) {
      return redirect("/");
    }
  }
}
