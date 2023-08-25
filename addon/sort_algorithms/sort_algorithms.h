#include <node_api.h>

#ifndef SORT_ALGORITHMS_H
#define SORT_ALGORITHMS_H

namespace addon
{
    napi_value bubble_sort(napi_env env, napi_callback_info info);
    napi_value counting_sort(napi_env env, napi_callback_info info);
    napi_value heap_sort(napi_env env, napi_callback_info info);
    napi_value insertion_sort(napi_env env, napi_callback_info info);
    napi_value merge_sort(napi_env env, napi_callback_info info);
    napi_value quick_sort(napi_env env, napi_callback_info info);
    napi_value radix_sort(napi_env env, napi_callback_info info);
    napi_value selection_sort(napi_env env, napi_callback_info info);
    napi_value std_sort(napi_env env, napi_callback_info info);
}

#endif