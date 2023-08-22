#include <node_api.h>
#include <vector>

using namespace std;

#ifndef HELPERS_H
#define HELPERS_H

namespace addon {
    vector<int> get_elements_of_array(napi_env env, napi_callback_info info);
    napi_value convert_to_napi_array(napi_env env, vector<int> elements);
}

#endif