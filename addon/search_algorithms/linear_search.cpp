#include <node_api.h>
#include <vector>
#include <string>
#include "../helpers/helpers.h"

using namespace std;

namespace addon
{

    napi_value linear_search(napi_env env, napi_callback_info info)
    {
        napi_value result;
        vector<int> array = get_elements_of_array(env, info);
        int target = get_searched_int(env,info);

        for (int i = 0; i < array.size(); ++i)
        {
            if (array[i] == target)
            {
                napi_create_int32(env, i, &result);
                return result;
            }
        }

        napi_create_int32(env, -1, &result);
        return result;
    }
}
