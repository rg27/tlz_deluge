var app_type = ZDK.Page.getField("Type").getValue();
var app_stage = ZDK.Page.getField("New_Resident_Visa_Stage").getValue();


if (app_type == "New Trade License")
{
    if (app_stage == "Start")
    {
        log("Stage: " + app_stage);
        var application_id = $Page.record_id;
        log("App ID: " + application_id);
        var parameters = {};
        var headers = {};

        var app_details = ZDK.Apps.CRM.Applications1.fetchById(application_id);
        var tc_and_other_files = app_details.Terms_and_Conditions;
        log("Terms and conditions: " + tc_and_other_files);
        if (tc_and_other_files != null)
        {
            var application_new_license_form = ZDK.Apps.CRM.Connections.invoke("all_crm_modules", "https://www.zohoapis.com/crm/v2/Applications1/" + application_id + "/New_License_Application1", "GET", 1, parameters, headers);
            var application_company_members = ZDK.Apps.CRM.Connections.invoke("all_crm_modules", "https://www.zohoapis.com/crm/v2/Applications1/" + application_id + "/Company_Members", "GET", 1, parameters, headers);
            var application_new_license_forms_string = JSON.stringify(application_new_license_form);
            var application_company_members_string = JSON.stringify(application_company_members);
            log("App New License Stringify: " + application_new_license_forms_string);
            log("App Company Members Stringify: " + application_company_members_string);
            if (application_new_license_forms_string.includes("data") && application_company_members_string.includes("data"))
            {
                const number_of_shares = JSON.stringify(application_new_license_form._details.statusMessage.data[0].Number_of_Shares);
                const number_of_shareholder = JSON.stringify(application_new_license_form._details.statusMessage.data[0].Number_of_Shareholders);
                log("Number of Shares: " + number_of_shares);
                log("Number of Shareholder: " + number_of_shareholder)
                var company_members = application_company_members._details.statusMessage.data;
                var company_member_length =   company_members.length;
                log("Company Members Length: " + company_member_length);
                var sum_of_number_of_share = 0;
                var cm_valid_counter = 0;
                var total_passport = 0;
                var gm_counter = 0;
                var ifza_t_and_c_counter = 0;
                var tlz_t_and_c_counter = 0;
                var ifza_office_pricing_counter = 0;
                var ifza_property_pricelist_counter = 0;
                var shareholder_counter = 0;
                company_members.forEach(function (company_member) {
                if (company_member.Roles_s.includes("Shareholder"))
                {
                    shareholder_counter = shareholder_counter + 1;
                }

                //Get the Number of share of Shareholders
                sum_of_number_of_share = sum_of_number_of_share + company_member.Number_of_Shares;
                
                //validate and count the CM valid field
                if ( company_member.CM_Valid == true)
                {
                    cm_valid_counter = cm_valid_counter + 1;
                }
                //validate and count passport files
                if ( company_member.Passport_file != undefined && company_member.Passport_file != "")
                {
                    total_passport = total_passport + 1;
                }
                //Not available right now, under Development roadmap
                log("Roles: " + company_member.Role_s);
                if (company_member.Roles_s.includes("General Manager") )
                {
                    gm_counter = gm_counter + 1;
                }});

                // log("Shareholder Counter: " + shareholder_counter)
                // ZDK.Client.showAlert('Shareholder Counter: ' + shareholder_counter);
                //terms and condition files loop
                var application_upload_files = JSON.stringify(tc_and_other_files);
                tc_and_other_files.forEach(function (tc_and_other_file) {
                    if (tc_and_other_file.file_Name.includes("IFZA") && tc_and_other_file.file_Name.includes("T&C"))
                    {
                        ifza_t_and_c_counter = ifza_t_and_c_counter + 1;
                    }

                    if (tc_and_other_file.file_Name.includes("Trade License Zone")  && tc_and_other_file.file_Name.includes("Conditions"))
                    {
                        tlz_t_and_c_counter = tlz_t_and_c_counter + 1;
                        log("TLZ TC Count: " + ifza_t_and_c_counter);
                    }

                    if (tc_and_other_file.file_Name.includes("IFZA")  && tc_and_other_file.file_Name.includes("Office Pricing") && tc_and_other_file.file_Name.includes("Visa Licenses") && tc_and_other_file.file_Name.includes("plus"))
                    {
                        ifza_office_pricing_counter = ifza_office_pricing_counter + 1;
                    }

                    if (tc_and_other_file.file_Name.includes("IFZA") && tc_and_other_file.file_Name.includes("Property Price List"))
                    {
                        ifza_property_pricelist_counter = ifza_property_pricelist_counter + 1;
                    }
                });
                    
                log("Sum of Number of Shares: " + sum_of_number_of_share);
                log("Total CM Valid Counter : " + cm_valid_counter);

                //Number of Shares validation
                if ( number_of_shares != sum_of_number_of_share)
                {
                    ZDK.Client.showMessage('Number of Share is not equal.', { type: 'error' });
                    return false;
                }

                //Number of Shareholder validation
                if ( number_of_shareholder != shareholder_counter)
                {
                    ZDK.Client.showMessage('Number of Shareholders is not equal', { type: 'error' });
                    return false;
                }

                //Company Member Valid Counter Validation
                if ( cm_valid_counter != company_member_length)
                {
                    ZDK.Client.showMessage('Some Company Members are not valid', { type: 'error' });
                    return false;
                }

                //Total Passport Validation
                if ( total_passport != company_member_length)
                {
                    ZDK.Client.showMessage('Some Company Members have blank Passport File field.', { type: 'error' });
                    return false;
                }


                //Terms and Condition File Validation
                log("Terms and Conditions: " + tc_and_other_files)
                if ( tc_and_other_files == null)
                {
                    ZDK.Client.showMessage('Terms and Conditions field is empty.', { type: 'error' });
                    return false;
                }


                //IFZA T&C Validation
                if ( ifza_t_and_c_counter == 0)
                {
                    ZDK.Client.showMessage('IFZA Terms and Conditions file is not added.', { type: 'error' });
                    return false;
                }

                //TLZ T&C Validation
                if ( tlz_t_and_c_counter == 0)
                {
                    ZDK.Client.showMessage('TLZ Terms and Conditions file is not added.', { type: 'error' });
                    return false;
                }

                //IFZA Office Pricing Validation
                if ( ifza_office_pricing_counter == 0)
                {
                    ZDK.Client.showMessage('IFZA Office Pricing file is not added.', { type: 'error' });
                    return false;
                }

                //IFZA Property Pricelist validation
                if ( ifza_property_pricelist_counter == 0)
                {
                    ZDK.Client.showMessage('IFZA Property List file is not added.', { type: 'error' });
                    return false;
                }
            }
            else
            {
                ZDK.Client.showMessage('Error! Either New License Application or Company Members module is empty.', { type: 'error' });
                return false;
            }
            
        }
        else
        {
            ZDK.Client.showMessage('T&Cs For Signing file upload is empty.', { type: 'error' });
            return false;
        }   
    }
}



