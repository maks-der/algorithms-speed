#include <node_api.h>
#include "sort_algorithms/sort_algorithms.h"
#include "search_algorithms/search_algorithms.h"

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

            {"binarySearch", nullptr, binary_search, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"exponentialSearch", nullptr, exponential_search, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"fibonacciSearch", nullptr, fibonacci_search, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"interpolationSearch", nullptr, interpolation_search, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"jumpSearch", nullptr, jump_search, nullptr, nullptr, nullptr, napi_default, nullptr},
            {"linearSearch", nullptr, linear_search, nullptr, nullptr, nullptr, napi_default, nullptr},
        };

        napi_define_properties(env, exports, sizeof(descriptors) / sizeof(descriptors[0]), descriptors);
        return exports;
    }

    NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
}