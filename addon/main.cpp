#include <node_api.h>
#include "algorithms/algorithms.h"

namespace addon
{
    napi_value Init(napi_env env, napi_value exports)
    {
        napi_property_descriptor descriptors[] = {
            {"bubbleSort", nullptr, bubble_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"countingSort", nullptr, counting_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"heapSort", nullptr, heap_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"insertionSort", nullptr, insertion_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"mergeSort", nullptr, merge_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"quickSort", nullptr, quick_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"radixSort", nullptr, radix_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"selectionSort", nullptr, selection_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"stdSort", nullptr, std_sort, nullptr, nullptr, nullptr, napi_default, nullptr},
        };

        napi_define_properties(env, exports, sizeof(descriptors) / sizeof(descriptors[0]), descriptors);
        return exports;
    }

    NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);

}