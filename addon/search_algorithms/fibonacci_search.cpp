#include <iostream>
#include <vector>
#include <algorithm>
#include <node_api.h>
#include "../helpers/helpers.h"

namespace addon
{
    napi_value fibonacci_search(napi_env env, napi_callback_info info)
    {
        napi_value result;

        vector<int> array = get_elements_of_array(env, info);
        int target = get_searched_int(env, info);

        int fibMMinus2 = 0;                 // (m-2)th Fibonacci number
        int fibMMinus1 = 1;                 // (m-1)th Fibonacci number
        int fibM = fibMMinus1 + fibMMinus2; // mth Fibonacci number

        while (fibM < array.size())
        {
            fibMMinus2 = fibMMinus1;
            fibMMinus1 = fibM;
            fibM = fibMMinus1 + fibMMinus2;
        }

        int offset = -1;

        while (fibMMinus2 > 0)
        {
            int i = min(offset + fibMMinus2, static_cast<int>(array.size() - 1));

            if (array[i] < target)
            {
                fibM = fibMMinus1;
                fibMMinus1 = fibMMinus2;
                fibMMinus2 = fibM - fibMMinus1;
                offset = i;
            }
            else if (array[i] > target)
            {
                fibM = fibMMinus2;
                fibMMinus1 -= fibMMinus2;
                fibMMinus2 = fibM - fibMMinus1;
            }
            else
            {
                napi_create_int32(env, i, &result);
                return result;
            }
        }

        if (fibMMinus1 && array[offset + 1] == target)
        {
            napi_create_int32(env, offset + 1, &result);
            return result;
        }

        napi_create_int32(env, -1, &result);
        return result;
    }
}
