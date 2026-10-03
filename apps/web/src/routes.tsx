import type { RouteObject } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Placeholder } from './pages/Placeholder';

export const routes: RouteObject[] = [
  {
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'map',
        element: (
          <Placeholder
            title="Suitability map"
            description="H3 hexagons coloured by final score for the selected species, with filters and a cell detail panel."
            phase={5}
            pending="MapLibre GL + deck.gl H3HexagonLayer, DROM insets and the cell panel are built in Phase 5."
          />
        ),
      },
      {
        path: 'species',
        element: (
          <Placeholder
            title="Species"
            description="Nine medical species: taxonomy, medical applications, tolerance bands, conservation status and references."
            phase={5}
            pending="Species list and detail pages read from /api/species (Phase 4) and are built in Phase 5."
          />
        ),
      },
      {
        path: 'species/:slug',
        element: (
          <Placeholder
            title="Species detail"
            description="Tolerance bands, medical uses, references and occurrence map."
            phase={5}
            pending="Built in Phase 5 on top of /api/species/:id."
          />
        ),
      },
      {
        path: 'compare',
        element: (
          <Placeholder
            title="Compare cells"
            description="Two to four cells side by side: radar chart and parameter table."
            phase={5}
            pending="Built in Phase 5 on top of /api/compare."
          />
        ),
      },
      {
        path: 'model',
        element: (
          <Placeholder
            title="Model"
            description="Hybrid expert + machine-learning score, step by step, with metrics and the model card."
            phase={5}
            pending="Metrics come from the trained models in Phase 3; the interactive explainer is built in Phase 5."
          />
        ),
      },
      {
        path: 'sources',
        element: (
          <Placeholder
            title="Data sources"
            description="Provenance registry: source, licence, retrieval date, resolution and coverage."
            phase={5}
            pending="Provenance records are produced in Phase 2 and displayed here in Phase 5."
          />
        ),
      },
      {
        path: 'contribute',
        element: (
          <Placeholder
            title="Contribute"
            description="Submit a field observation or a cultivation trial result with references."
            phase={5}
            pending="Requires authentication (Phase 4); the multi-step form is built in Phase 5."
          />
        ),
      },
      {
        path: 'admin',
        element: (
          <Placeholder
            title="Administration"
            description="Validation queue and model retraining."
            phase={5}
            pending="Requires the admin role (Phase 4); the queue and retrain controls are built in Phase 5."
          />
        ),
      },
      {
        path: 'login',
        element: (
          <Placeholder
            title="Sign in"
            description="Contributor and administrator access."
            phase={4}
            pending="Email + password authentication with Argon2id and httpOnly JWT cookies is implemented in Phase 4."
          />
        ),
      },
      {
        path: 'account',
        element: (
          <Placeholder
            title="Account"
            description="Export or delete your personal data."
            phase={4}
            pending="GDPR export and deletion endpoints are implemented in Phase 4."
          />
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
