import { ThemeProvider } from '@mui/material/styles';
import { Typography, CssBaseline } from '@mui/material';
import { Card, getTheme } from '@schimufa/design-system';

function App() {
  return (
    <ThemeProvider theme={getTheme('finance')}>
      <CssBaseline />
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card variant="glass">
            <div className="text-center py-6">
              <Typography component="h1" variant="h4" gutterBottom>
                Clean Design System
              </Typography>
              <Typography
                component="h2"
                variant="subtitle1"
                color="text.secondary"
              >
                Minimal • Modern • Elegant
              </Typography>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Typography Card */}
            <Card
              variant="default"
              title="Typography"
              subtitle="Clean, readable fonts Perfect hierarchy"
            >
              <div className="space-y-4 mt-6">
                <div className="bg-blue-500 text-white px-6 py-2 rounded-full inline-block">
                  Primary
                </div>
                <div className="border border-blue-500 text-blue-500 px-6 py-2 rounded-full inline-block">
                  Secondary
                </div>
                <div className="text-gray-500 mt-2">Tertiary</div>
              </div>
            </Card>

            {/* Components Card */}
            <Card
              variant="default"
              title="Components"
              subtitle="Consistent elements Reusable patterns"
            >
              <div className="space-y-4 mt-6">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="bg-white rounded p-2 border border-gray-200">
                    Input field
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="bg-white rounded p-2 border border-gray-200">
                    Card component
                    <div className="text-sm text-gray-500 mt-1">
                      Clean layout structure
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Colors Card */}
            <Card
              variant="default"
              title="Colors"
              subtitle="Harmonious palette Accessible contrast"
            >
              <div className="mt-6">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                  <div className="w-8 h-8 rounded-full bg-red-500"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-400"></div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    Warning
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
