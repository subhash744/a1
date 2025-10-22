"use client"

import { useEffect, useRef } from "react"
import type { UserProfile } from "@/lib/storage"
import { getLeaderboard } from "@/lib/storage"

interface MapComponentProps {
  users: UserProfile[]
  selectedUserId: string | null
  onPinClick: (userId: string) => void
}

export default function MapComponent({ users, selectedUserId, onPinClick }: MapComponentProps) {
  const mapRef = useRef<any | null>(null)
  const markersRef = useRef<Map<string, any>>(new Map())

  const getRankTier = (userId: string): "gold" | "silver" | "bronze" => {
    const leaderboard = getLeaderboard("all-time")
    const userRank = leaderboard.find((u) => u.userId === userId)?.rank || 999
    if (userRank <= 10) return "gold"
    if (userRank <= 50) return "silver"
    return "bronze"
  }

  const getPinColor = (tier: "gold" | "silver" | "bronze"): string => {
    switch (tier) {
      case "gold":
        return "#FFD700"
      case "silver":
        return "#C0C0C0"
      case "bronze":
        return "#CD7F32"
    }
  }

  useEffect(() => {
    if (typeof window === "undefined" || !window.L) {
      return
    }

    const L = window.L

    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20, 0], 2)

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(mapRef.current)
    }

    // Clear existing markers
    markersRef.current.forEach((marker: any) => {
      mapRef.current?.removeLayer(marker)
    })
    markersRef.current.clear()

    const MarkerClusterGroup = (L as any).markerClusterGroup
    const markerGroup = new MarkerClusterGroup()

    users.forEach((user) => {
      if (user.location && (user.location.lat !== 0 || user.location.lng !== 0)) {
        const tier = getRankTier(user.id)
        const color = getPinColor(tier)

        const iconHtml = `
          <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            font-weight: bold;
            font-size: 12px;
            color: ${tier === "gold" ? "#333" : "white"};
          ">
            ${user.displayName.charAt(0)}
          </div>
        `

        const icon = L.divIcon({
          html: iconHtml,
          iconSize: [32, 32],
          className: "custom-marker",
        })

        const marker = L.marker([user.location.lat, user.location.lng], {
          icon,
          title: user.displayName,
        })

        const popupContent = `
          <div class="p-3 min-w-48">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-sm font-semibold">
                ${user.displayName.charAt(0)}
              </div>
              <div>
                <p class="font-semibold text-sm">${user.displayName}</p>
                <p class="text-xs text-gray-600">@${user.username}</p>
              </div>
            </div>
            <p class="text-xs text-gray-600 mb-2">${user.location.city}, ${user.location.country}</p>
            <div class="grid grid-cols-2 gap-2 mb-3">
              <div class="bg-gray-100 p-2 rounded">
                <p class="text-xs text-gray-600">Views</p>
                <p class="font-semibold text-sm">${user.views}</p>
              </div>
              <div class="bg-gray-100 p-2 rounded">
                <p class="text-xs text-gray-600">Upvotes</p>
                <p class="font-semibold text-sm">${user.upvotes}</p>
              </div>
            </div>
            <button onclick="window.location.href='/profile/${user.id}'" class="w-full px-3 py-1 bg-gray-800 text-white rounded text-xs font-medium hover:bg-gray-700">
              View Profile
            </button>
          </div>
        `

        marker.bindPopup(popupContent)
        marker.on("click", () => onPinClick(user.id))

        markersRef.current.set(user.id, marker)
        markerGroup.addLayer(marker)
      }
    })

    mapRef.current?.addLayer(markerGroup)

    // Highlight selected marker
    if (selectedUserId && markersRef.current.has(selectedUserId)) {
      const marker = markersRef.current.get(selectedUserId)
      marker?.openPopup()
    }
  }, [users, selectedUserId, onPinClick])

  return <div id="map" className="w-full h-full" style={{ minHeight: "600px" }} />
}
