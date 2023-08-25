#include <node_api.h>
#include "sort_algorithms.h"
#include <vector>
#include <algorithm>
#include "../helpers/helpers.h"

namespace addon
{
    bool compareIntegers(int a, int b)
    {
        return a < b;
    }

    napi_value std_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);

        sort(elements.begin(), elements.end(), compareIntegers);

        return convert_to_napi_array(env, elements);
    }
}