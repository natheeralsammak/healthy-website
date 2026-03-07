import SwiftUI

struct ContentView: View {
    @State private var network = NetworkMonitor()
    @State private var isLoading = true
    @State private var webViewId = UUID()

    private var startURL: URL {
        let lang = Locale.preferredLanguages.first ?? "en"
        let base = "https://natheeralsammak.github.io/healthy-website/v2"
        return URL(string: lang.hasPrefix("ar") ? "\(base)/ar/index.html" : "\(base)/index.html")!
    }

    var body: some View {
        ZStack {
            if network.isConnected {
                WebView(url: startURL, isLoading: $isLoading)
                    .id(webViewId)
                    .ignoresSafeArea(edges: .bottom)

                if isLoading {
                    VStack {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: Color.accentColor))
                            .scaleEffect(1.2)
                            .padding(.top, 8)
                        Spacer()
                    }
                }
            } else {
                OfflineView { webViewId = UUID() }
            }
        }
    }
}
