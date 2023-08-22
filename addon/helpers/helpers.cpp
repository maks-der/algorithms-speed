#include <node_api.h>
#include <vector>

using namespace std;

namespace addon
{
    vector<int> get_elements_of_array(napi_env env, napi_callback_info info)
    {
        std::vector<int> elements;

        napi_value thisArg;
        napi_get_cb_info(env, info, nullptr, nullptr, &thisArg, nullptr);

        uint32_t length;
        napi_get_array_length(env, thisArg, &length);

        for (uint32_t i = 0; i < length; ++i)
        {
            napi_value value;
            napi_get_element(env, thisArg, i, &value);

            int intValue;
            napi_get_value_int32(env, value, &intValue);

            elements.push_back(intValue);
        }

        return elements;
    }

    napi_value convert_to_napi_array(napi_env env, vector<int> elements)
    {
        napi_value sortedArray;
        napi_create_array(env, &sortedArray);

        for (size_t i = 0; i < elements.size(); ++i)
        {
            napi_value value;
            napi_create_int32(env, elements[i], &value);
            napi_set_element(env, sortedArray, i, value);
        }

        return sortedArray;
    }
}