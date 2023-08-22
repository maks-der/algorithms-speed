#include <node_api.h>

#ifndef ALGORITHMS_H // Header guard to prevent multiple inclusions
#define ALGORITHMS_H

namespace addon {
    napi_value bubble_sort(napi_env env, napi_callback_info info);
}

#endif