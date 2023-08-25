#include <iostream>
#include <vector>
#include <cmath>
#include <node_api.h>
#include "../helpers/helpers.h"

namespace addon
{

    napi_value jump_search(napi_env env, napi_callback_info info)
    {
        napi_value result;
        vector<int> array = get_elements_of_array(env, info);
        int target = get_searched_int(env, info);

        int size = array.size();
        int step = sqrt(size); // Determine the block size

        int prev = 0;
        while (array[min(step, size) - 1] < target)
        {
            prev = step;
            step += sqrt(size);
            if (prev >= size)
            {
                napi_create_int32(env, -1, &result);
                return result;
            }
        }

        while (array[prev] < target)
        {
            prev++;

            if (prev == min(step, size))
            {
                napi_create_int32(env, -1, &result);
                return result;
            }
        }

        if (array[prev] == target)
        {
            napi_create_int32(env, prev, &result);
            return result;
        }

        napi_create_int32(env, -1, &result);
        return result;
    }
}