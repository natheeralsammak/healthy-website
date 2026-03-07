import SwiftUI

struct OfflineView: View {
    var onRetry: () -> Void

    var body: some View {
        VStack(spacing: 24) {
            Spacer()
            Image(systemName: "wifi.slash")
                .font(.system(size: 64))
                .foregroundStyle(Color.accentColor)
            Text("No Internet Connection")
                .font(.title2).fontWeight(.bold)
            Text("Please check your connection and try again.")
                .font(.body).foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 40)
            Button(action: onRetry) {
                Label("Try Again", systemImage: "arrow.clockwise")
                    .fontWeight(.semibold)
                    .padding(.horizontal, 32)
                    .padding(.vertical, 12)
            }
            .buttonStyle(.borderedProminent)
            .tint(Color.accentColor)
            Spacer()
        }
    }
}
