#include <iostream>
#include <vector>
#include <node_api.h>
#include "../helpers/helpers.h"

namespace addon
{
    napi_value interpolation_search(napi_env env, napi_callback_info info)
    {
        napi_value result;
        vector<int> array = get_elements_of_array(env, info);
        int target = get_searched_int(env, info);

        int left = 0;
        int right = array.size() - 1;

        while (left <= right && target >= array[left] && target <= array[right])
        {
            if (left == right)
            {
                if (array[left] == target)
                {
                    napi_create_int32(env, left, &result);
                    return result;
                }
                napi_create_int32(env, -1, &result);
                return result;
            }

            // Interpolate the position of target
            int pos = left + ((target - array[left]) * (right - left)) / (array[right] - array[left]);

            if (array[pos] == target)
            {
                napi_create_int32(env, pos, &result);
                return result;
            }
            else if (array[pos] < target)
            {
                left = pos + 1; // Search in the right half
            }
            else
            {
                right = pos - 1; // Search in the left half
            }
        }

        napi_create_int32(env, -1, &result);
        return result;
    }
}