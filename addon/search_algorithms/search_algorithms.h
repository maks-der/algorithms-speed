#include <node_api.h>

#ifndef SEARCH_ALGORITHMS_H
#define SEARCH_ALGORITHMS_H

namespace addon
{
    napi_value binary_search(napi_env env, napi_callback_info info);
    napi_value exponential_search(napi_env env, napi_callback_info info);
    napi_value fibonacci_search(napi_env env, napi_callback_info info);
    napi_value interpolation_search(napi_env env, napi_callback_info info);
    napi_value jump_search(napi_env env, napi_callback_info info);
    napi_value linear_search(napi_env env, napi_callback_info info);
}

#endif