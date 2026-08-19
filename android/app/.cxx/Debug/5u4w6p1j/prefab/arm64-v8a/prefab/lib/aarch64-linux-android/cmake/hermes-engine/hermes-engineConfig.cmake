if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "/root/.gradle/caches/9.3.1/transforms/4307950e5448fb11f413034cac63da92/transformed/hermes-android-250829098.0.16-debug/prefab/modules/hermesvm/libs/android.arm64-v8a/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "/root/.gradle/caches/9.3.1/transforms/4307950e5448fb11f413034cac63da92/transformed/hermes-android-250829098.0.16-debug/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

