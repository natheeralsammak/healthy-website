# HealthyLife iOS App

A native iOS wrapper for the HealthyLife website.

## Setup

1. Open this folder in Xcode (File > Open)
2. Or create a new Xcode project:
   - File > New > Project > App
   - Product Name: HealthyLifeApp
   - Team: (your Apple Developer account)
   - Organization Identifier: com.natheeralsammak
   - Interface: SwiftUI
   - Language: Swift
   - Minimum Deployment: iOS 16.0
3. Replace the generated Swift files with the ones in this folder
4. Copy the Assets.xcassets folder
5. Build and run on simulator or device

## Bundle ID
`com.natheeralsammak.healthylife`

## Features
- Auto-detects device language (English/Arabic)
- Pull-to-refresh
- Offline detection with native retry screen
- External links open in Safari
- Swipe back/forward navigation
- Native loading indicator
