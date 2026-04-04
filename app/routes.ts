import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("pages/HomePage.tsx"),
    route("fiches", "pages/FichesPage.tsx"),
    route("fiches/:id", "pages/FicheDetailPage.tsx"),
    route("exercices", "pages/ExercicesPage.tsx"),
    route("exercices/:id", "pages/ExerciceDetailPage.tsx"),
    route("generateur", "pages/GenerateurPage.tsx"),
    route("*", "pages/NotFoundPage.tsx"),
  ]),
] satisfies RouteConfig;
