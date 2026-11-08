#pragma once
#include <cstdint>

// Servyy — offsets
// URL: https://heliynn.github.io/offsets.hpp
//
// Kept in sync with offsets.json. When you change a value, update both files
// and bump version + updated here and in the JSON.

namespace offsets {
    inline constexpr const char* version = "1.0.0";
    inline constexpr const char* updated = "2026-11-08";

    // Example entries — replace the names and values with your own.
    inline constexpr std::uintptr_t PlayerBase   = 0x0;
    inline constexpr std::uintptr_t PlayerHealth = 0x0;
    inline constexpr std::uintptr_t PlayerTeam   = 0x0;
}
