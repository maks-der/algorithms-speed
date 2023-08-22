#include <node_api.h>
#include "algorithms/algorithms.h"

namespace addon
{
    napi_value Init(napi_env env, napi_value exports)
    {
        napi_property_descriptor descriptors[] = {
            {"bubbleSort", nullptr, bubble_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
        };

        napi_define_properties(env, exports, sizeof(descriptors) / sizeof(descriptors[0]), descriptors);
        return exports;
    }

    NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);

}