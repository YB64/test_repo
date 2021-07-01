import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from 'components/CustomButtons/Button.js';
// import FileUpload from 'components/FileUpload/FileUpload.js';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from 'assets/jss/material-kit-react/views/dashboardPage.js';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {DialogTitle, DialogContent, DialogActions}  from 'components/Custom/Dialog.js'
import Dialog from '@material-ui/core/Dialog';
import * as service from 'service/JobSeekerService.js';
// import * as userService from 'service/UserService.js';
import * as constant from 'constant/hashcodeConstants';
import { useSelector } from "react-redux";

const filter = createFilterOptions();   

let useStyles = makeStyles(styles);

export default function JobSeekerForm(props) {
  let editJobSeeker = 0;
  const userInfo = useSelector((state) => state.authentication.user);
  const classes = useStyles();
  const [detailsPage, setDetailsPage] = React.useState(false);
  const [selectedJobSeeker, setSelectedJobSeeker] = React.useState(null);
  const [expMonthsOpen, setExpMonthsOpen] = React.useState(false);
  const [jobType, setJobType] = React.useState('');
  const [jobSeekerList, setJobSeekerList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [jobSeekerDetailsOpen, setJobSeekerDetailsOpen] = React.useState(false)
  // const [editJobSeeker, setEditJobSeeker] = React.useState(0);
  // const [userProfile, setUserProfile] = React.useState(null);
  const [interestArea, setInterestArea] = React.useState([]);
  const [expertiseArea,setExpertiseArea] = React.useState([]);
  const [enrollNowDialogOpen, setEnrollNowDialogOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
        const response = await service.getJobSeekerEnrollments(userInfo.userId);
        // const userProfileResp = await userService.getUserProfile(userInfo.userId);
        setIsLoading(false);
        setJobSeekerList(response);
        // initializeUserProfileFields(userProfileResp);
    }
    fetchData();
  }, [userInfo.userId]);

  React.useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  // initialize user profile fields

  // const initializeUserProfileFields = (userProfileResp) => {
  //   setUserProfile(userProfileResp);
  //   setExperienceList(userProfileResp.listOfWorkExperience);
  //   setProjectList(userProfileResp.listOfProjects);
  //   setAcademicList(userProfileResp.listOfAcademicsQualifications);
  //   setSkillSet(userProfileResp.listOfSkillsAndExpertise);
  //   setCertificationList(userProfileResp.listOfCertificate);
  // }

  const handleExpMonthsClose = () => {
    setExpMonthsOpen(false);
  };

  const handleExpMonthsOpen = () => {
    setExpMonthsOpen(true);
  };

  const handleEnrollBtn = async (e) => {
    setEnrollNowDialogOpen(true);
  };
  
 const handleJobSeekerDetailsPage = async (jobSeeker) => {
  setDetailsPage(true);
  setSelectedJobSeeker(jobSeeker);
};

const handleBackJobSeekerDetailsPage = async (e) => {
  setDetailsPage(false);
  resetState();
};

const editJobSeekerDetails = () =>{
  setJobSeekerDetailsOpen(true);
}

const resetState = () =>{
  setSelectedJobSeeker(null);
}

const jobSeekerDetails = () =>{
  return (<>
  <div>
    <img alt={"Banner"} className={classes.bannerImage} src="https://image.freepik.com/free-vector/abstract-dotted-banner-background_1035-18160.jpg"></img>
    <Card style={{marginBottom:'10px', backgroundColor:'white',display:'flex'}}>
      <CardContent style={{padding:'8px', height:'300px', width: '100%'}}>
        <Grid container spacing={2} style={{padding: '0 12px'}}>
            <div style={{marginTop: '4px',fontSize: '24px',fontWeight: '600'}}>
              {selectedJobSeeker.tagLine}
            </div>
            <div style={{margin: '0 0 0 auto'}}>
                <IconButton style={{padding:'4px'}} aria-label="edit" color="primary">
                    <EditIcon fontSize="small"  onClick={()=> editJobSeekerDetails() } />
                </IconButton>
            </div>
  <div style={{marginTop: '10px',width: '100%'}}>Experience: {selectedJobSeeker.experience_year} year {selectedJobSeeker.experience_month} months</div>
            <div style={{marginTop: '10px',width: '100%'}}>Job Type: {selectedJobSeeker?.interestJobType?.toString()}</div>
            <div style={{marginTop: '10px',width: '100%'}}>Summary: {selectedJobSeeker.summary}</div>
            <div style={{marginTop: '10px',width: '100%'}}>Area of Expertise: {selectedJobSeeker?.areaOfExpertise?.toString()}</div>
            <div style={{marginTop: '10px',width: '100%'}}>Interested Domains: {selectedJobSeeker?.interestDomains?.toString()}</div>
            <div style={{marginTop: '10px',width: '100%'}}>Preferred Time to Call: {selectedJobSeeker.preferTimeToCall}</div>
        </Grid>
      </CardContent>            
    </Card>

  </div>
  <ButtonGroup className={classes.buttonGroup}>
    <Button variant="contained" className={classes.button} onClick={handleBackJobSeekerDetailsPage}>
      Back
    </Button>
  </ButtonGroup>
  </>);
}

const jobSeekerDetailsDialog = () => {
  return <Dialog onClose={handleJobSeekerDetailsDialogClose} maxWidth={"md"} className={classes.dialogContainer} aria-labelledby="customized-dialog-title" open={jobSeekerDetailsOpen}>
    <DialogTitle id="customized-dialog-title" onClose={handleJobSeekerDetailsDialogClose}>
        Update Job details
        </DialogTitle> 
        <DialogContent dividers style={{height : '400px'}}>
        <div className={classes.editStartupRoot}>
                <form noValidate autoComplete="off" id={`startupupdate${editJobSeeker}`} onSubmit= {handleJobSeekerDetailsDialogUpdate}>  
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={2}>
                            <TextField
                                required
                                id="expYear"
                                name="expYear"
                                label="Exp Year"
                                fullWidth
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                defaultValue={selectedJobSeeker.experience_year}
                            />
                          </Grid> 
                          <Grid item  xs={12} sm={2}>
                            <FormControl style={{width : '100%'}}>
                                <InputLabel fullWidth id="expMonthsLabel">Exp Months</InputLabel>
                                <Select
                                  labelId="expMonthsLabel"
                                    id="expMonths"
                                    open={expMonthsOpen}
                                    onClose={handleExpMonthsClose}
                                    onOpen={handleExpMonthsOpen}
                                    defaultValue={selectedJobSeeker.experience_month}
                                    fullWidth
                                >
                                  <MenuItem value={0}>0</MenuItem>
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                  <MenuItem value={11}>11</MenuItem>
                                  <MenuItem value={12}>12</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid> 
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="tagline"
                                    name="tagline"
                                    label="Tag Line"
                                    fullWidth
                                    defaultValue={selectedJobSeeker.tagLine}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Autocomplete
                                multiple
                                id="jobType"
                                limitTags={3}
                                defaultValue={selectedJobSeeker?.interestJobType?.map(e => {
                                  return {label: e, value: e};
                                })}
                                options={constant.employmentTypeList}
                                getOptionLabel={(option) => option.value}
                                onChange={(event, newValue) => {
                                    if(newValue.length > 0 &&  newValue[newValue.length-1].type === "CustomValue"){
                                        newValue[newValue.length-1].value = newValue[newValue.length-1].label;
                                    }
                                    handleJobTypeChange(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                      {...params}
                                      variant="standard"
                                      label="Interested Job Type"
                                      placeholder="Interest Job Type"
                                      helperText="Please select interested job types."
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                              <Autocomplete
                                multiple
                                id="interestArea"
                                limitTags={3}
                                defaultValue={selectedJobSeeker.interestDomains.map(e => {
                                  return {label: e, value: e};
                                })}
                                options={constant.jobInterestList}
                                getOptionLabel={(option) => option.value}
                                filterOptions={(options, params) => {
                                  const filtered = filter(options, params);
                        
                                  if (params.inputValue !== '') {
                                    filtered.push({
                                      type: "CustomValue",
                                      label: params.inputValue,
                                      value: `Add "${params.inputValue}"`,
                                    });
                                  }
                        
                                  return filtered;
                                }}
                              onChange={(event, newValue) => {
                                  if(newValue.length > 0 &&  newValue[newValue.length-1].type === "CustomValue"){
                                      newValue[newValue.length-1].value = newValue[newValue.length-1].label;
                                  }
                                  setInterestArea(newValue);
                              }}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Interest Domain"
                                    placeholder="Interest Domain"
                                    helperText="Ex: CA, Digital Marketing, Content Writer, UX, UI, Java, Testing, ... "
                                />
                                )}
                            />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Autocomplete
                                multiple
                                id="areaOfExpertise"
                                limitTags={3}
                                defaultValue={selectedJobSeeker.areaOfExpertise.map(e => {
                                  return {label: e, value: e};
                                })}
                                options={constant.areaOfExpertiseList}
                                getOptionLabel={(option) => option.value}
                                filterOptions={(options, params) => {
                                  const filtered = filter(options, params);
                        
                                  if (params.inputValue !== '') {
                                    filtered.push({
                                      type: "CustomValue",
                                      label: params.inputValue,
                                      value: `Add "${params.inputValue}"`,
                                    });
                                  }
                        
                                  return filtered;
                                }}
                                onChange={(event, newValue) => {
                                    if(newValue.length > 0 &&  newValue[newValue.length-1].type === "CustomValue"){
                                        newValue[newValue.length-1].value = newValue[newValue.length-1].label;
                                    }
                                    setExpertiseArea(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                      {...params}
                                      variant="standard"
                                      label="Area of Expertise"
                                      placeholder="Area of Expertise"
                                      helperText="Eg: Cloud/AWS, UI Developer, Digital Marketing, Accounting, ..."
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                  required
                                  id="preferTimeToCall"
                                  name="preferTimeToCall"
                                  label="Prefer Time To Call"
                                  fullWidth
                                  defaultValue={selectedJobSeeker.preferTimeToCall}
                              />
                            </Grid> 
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="summary"
                                    name="summary"
                                    label="Profile summary"
                                    fullWidth
                                    multiline
                                    defaultValue={selectedJobSeeker.summary}
                                />
                            </Grid>
                        </Grid>
                    </form>
              </div>
            </DialogContent>
        <DialogActions>
        {
            <Button form={`startupupdate${editJobSeeker}`} autoFocus type ="submit" size="medium"  color="primary">
                Update
        </Button>
        }     
    </DialogActions>
</Dialog>
}

const handleJobSeekerDetailsDialogUpdate = async (e) => {
   e.preventDefault();  
   switch(editJobSeeker) {
     case 0:
        const newData = {
          experience_year: e.target.querySelectorAll("input#expYear")[0].value,
          experience_month: e.target.querySelectorAll("#expMonths")[0].textContent,
          tagLine : e.target.querySelectorAll("input#tagline")[0].value,
          interestDomains: interestArea === '' ? null : interestArea.map(x => x.label),
          areaOfExpertise: expertiseArea === '' ? null : expertiseArea.map(x => x.label),
          interestJobType: jobType === '' ? null : jobType.map(x => x.label),
          summary: e.target.querySelectorAll("#summary")[0].value,
          preferTimeToCall :  e.target.querySelectorAll("input#preferTimeToCall")[0].value,
        };
       const updatedData = await service.updateJobSeeker(selectedJobSeeker.jobId, newData);
       setSelectedJobSeeker(updatedData);
       handleJobSeekerDetailsDialogClose();
       break;
     default:
       // code block
   }
};

 const enrollNow = async (e) => {
  setIsSaving(true);
    e.preventDefault();

    const data = {
      userId: userInfo.userId,
      experience_year: e.target.querySelectorAll("input#expYear")[0].value,
      experience_month: e.target.querySelectorAll("#expMonths")[0].textContent,
      tagLine : e.target.querySelectorAll("input#tagline")[0].value,
      interestDomains: interestArea === '' ? null : interestArea.map(x => x.label),
      areaOfExpertise: expertiseArea === '' ? null : expertiseArea.map(x => x.label),
      interestJobType: jobType === '' ? null : jobType.map(x => x.label),
      summary: e.target.querySelectorAll("#summary")[0].value,
      preferTimeToCall : e.target.querySelectorAll("input#preferTimeToCall")[0].value,
      wouldYouLikeToRefer : "yes",
    };
    await service.saveJobSeeker(data);
    const response = await service.getJobSeekerEnrollments(userInfo.userId);
    setIsSaving(false);
    setJobSeekerList(response);
    setEnrollNowDialogOpen(false);
 };

 const handleJobSeekerDetailsDialogClose = () => {
  setJobSeekerDetailsOpen(false);
};

 const enrollNowButton =() => {
  return(
  <>
  {detailsPage?
  <>
   {jobSeekerDetailsDialog()}
   {jobSeekerDetails()}
  </>:
  <>
  {isLoading?<div className={classes.root}> <CircularProgress /></div>:<></>}
  {enrollNowDialog()}
  {jobSeekerList?.map((c, index) => (   // TOOD: Need to fix for empty array
       <div onClick={() => {handleJobSeekerDetailsPage(c)}}>
          <Card style={{marginBottom:'10px', backgroundColor:'white',display:'flex'}}>
            <CardContent style={{padding:'8px', width:'100%'}}>
              <Grid container spacing={2}>
                  <Grid item xs={4} >
                      <Typography className={classes.cardHeader} component="h5" variant="h5">
                        Experience
                      </Typography>
                      <Typography variant="subtitle1" className={classes.cardDescription} color="textSecondary">
                          {c.experience_year} year {c.experience_month} months
                      </Typography>
                  </Grid>
                  <Grid item xs={4}>
                      <Typography component="h5" className={classes.cardHeader} variant="h5">
                        Job interest type
                      </Typography>
                      <Typography variant="subtitle1" className={classes.cardDescription} color="textSecondary">
                      {c.interestJobType?.toString()}
                      </Typography>
                  </Grid>
                  <Grid item xs={4}>
                      <Typography component="h5" className={classes.cardHeader} variant="h5">
                        Area Of Expertise
                      </Typography>
                      <Typography variant="subtitle1" className={classes.cardDescription} color="textSecondary">
                      {c.areaOfExpertise?.toString()}
                      </Typography>
                  </Grid>
                  <Grid item xs={4}>
                      <Typography component="h5" className={classes.cardHeader} variant="h5">
                        Interested Domains
                      </Typography>
                      <Typography variant="subtitle1" className={classes.cardDescription} color="textSecondary">
                      {c.interestDomains?.toString()}
                      </Typography>
                  </Grid>
                  <Grid item xs={4}>
                      <Typography component="h5" className={classes.cardHeader} variant="h5">
                        Prefer Time To Call 
                      </Typography>
                      <Typography variant="subtitle1" className={classes.cardDescription} color="textSecondary">
                      {c.preferTimeToCall}
                      </Typography>
                  </Grid>
              </Grid>
            </CardContent>            
        </Card>
       </div>
   ))}
   <Button
       variant="contained"
       color="primary"
       onClick={handleEnrollBtn}
       className={classes.button}
       endIcon={<Icon>send</Icon>}
           >
           Enroll Now
       </Button>
  </>
   }
   </>)
}
 
  const handleJobTypeChange = (newValue) => {
    setJobType(newValue);
  };

  const handleEnrollNowDialogClose = () => {
    setEnrollNowDialogOpen(false);
  };


  const enrollNowDialog = () => {
    return (
      <>{isSaving && <div className={classes.SavingProgress}> <CircularProgress style={{zIndex:'99999'}} /></div>}
     <Dialog
        onClose={handleEnrollNowDialogClose}
        maxWidth={"lg"}
        className={classes.dialogContainer}
        aria-labelledby="enroll-now"
        open={enrollNowDialogOpen}
      >
        <DialogTitle
          id="enroll-now"
          onClose={handleEnrollNowDialogClose}
        >
        JobSeeker Enrollment
        </DialogTitle>
        {/* <DialogContent dividers style={{height : '600px'}}> */}
        <DialogContent dividers>
          <div className={classes.editStartupRoot}>
          <form noValidate autoComplete="off" id="enrollNow" onSubmit={enrollNow}>
        <Grid container spacing={3}  style={{marginBottom: "20px"}}>
          <Grid item xs={12} sm={2}>
                  <TextField
                      required
                      id="expYear"
                      name="expYear"
                      label="Exp Year"
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                  />
          </Grid>  
          <Grid item  xs={12} sm={2}>
          <FormControl style={{width : '100%'}}>
              <InputLabel fullWidth id="expMonthsLabel">Exp Months</InputLabel>
              <Select
                  labelId="expMonthsLabel"
                  id="expMonths"
                  open={expMonthsOpen}
                  onClose={handleExpMonthsClose}
                  onOpen={handleExpMonthsOpen}
                  defaultValue="0"
                  fullWidth
              >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              </Select>
          </FormControl>
          </Grid> 
          <Grid item xs={8}>
            <TextField
                required
                id="tagline"
                name="tagline"
                label="Tagline"
                fullWidth
                helperText="One line summary about your experience."
            />
          </Grid>  
          <Grid item xs={12} sm={4}>
            <Autocomplete
              multiple
              id="jobType"
              limitTags={3}
              options={constant.employmentTypeList}
              getOptionLabel={(option) => option.value}
              onChange={(event, newValue) => {
                  if(newValue.length > 0 &&  newValue[newValue.length-1].type === "CustomValue"){
                      newValue[newValue.length-1].value = newValue[newValue.length-1].label;
                  }
                  handleJobTypeChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Interested Job Type"
                    placeholder="Interest Job Type"
                    helperText="Please select interested job types."
                />
              )}
            />
          </Grid> 
          <Grid item xs={12} sm={8}>
            <Autocomplete
              multiple
              id="interestArea"
              limitTags={3}
              options={constant.jobInterestList}
              getOptionLabel={(option) => option.value}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
      
                if (params.inputValue !== '') {
                  filtered.push({
                    type: "CustomValue",
                    label: params.inputValue,
                    value: `Add "${params.inputValue}"`,
                  });
                }
      
                return filtered;
              }}
            onChange={(event, newValue) => {
                if(newValue.length > 0 &&  newValue[newValue.length-1].type === "CustomValue"){
                    newValue[newValue.length-1].value = newValue[newValue.length-1].label;
                }
                setInterestArea(newValue);
            }}
              renderInput={(params) => (
              <TextField
                  {...params}
                  variant="standard"
                  label="Interest Area"
                  placeholder="Interest Area"
                  helperText="Ex: CA, Digital Marketing, Content Writer, UX, UI, Java, Testing, ... "
              />
              )}
          />
          </Grid> 
          <Grid item xs={8}>
          <Autocomplete
            multiple
            id="areaOfExpertise"
            limitTags={3}
            options={constant.areaOfExpertiseList}
            getOptionLabel={(option) => option.value}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
    
              if (params.inputValue !== '') {
                filtered.push({
                  type: "CustomValue",
                  label: params.inputValue,
                  value: `Add "${params.inputValue}"`,
                });
              }
    
              return filtered;
            }}
            onChange={(event, newValue) => {
                if(newValue.length > 0 &&  newValue[newValue.length-1].type === "CustomValue"){
                    newValue[newValue.length-1].value = newValue[newValue.length-1].label;
                }
                setExpertiseArea(newValue);
            }}
            renderInput={(params) => (
              <TextField
                  {...params}
                  variant="standard"
                  label="Area of Expertise"
                  placeholder="Area of Expertise"
                  helperText="Eg: Cloud/AWS, UI Developer, Digital Marketing, Accounting, ..."
              />
            )}
          />
          </Grid> 
          <Grid item xs={4}>
            <TextField
                required
                id="preferTimeToCall"
                name="preferTimeToCall"
                label="Prefer Time To Call"
                fullWidth
                defaultValue="9AM - 6PM"
            />
          </Grid> 
          <Grid item xs={12}>
            <TextField
                required
                id="summary"
                name="summary"
                label="Profile summary"
                fullWidth
                multiline
            />
          </Grid>
        </Grid>
        {/* <Typography variant="h6" gutterBottom>
          User Profile
        </Typography>
        <Grid container spacing={3}>
          <WorkExperience list={experienceList} userInfo={userInfo} ></WorkExperience>
          <Academics list={academicList} userInfo={userInfo} ></Academics>
          <Project list={projectList} userInfo={userInfo} ></Project>
          <Certification list={certificationList} userInfo={userInfo} ></Certification>
          <Skills list={skillSet} userInfo={userInfo} ></Skills>
          <AdditionalInfo userProfile={userProfile} userInfo={userInfo}></AdditionalInfo>
        </Grid> */}
      </form>
          </div>
        </DialogContent>
        <DialogActions>
          {
            <Button
              form="enrollNow"
              autoFocus
              type="submit"
              size="medium"
              color="primary"
              startIcon={<SaveIcon />}
            >
          Save
            </Button>
          }
        </DialogActions>
      </Dialog>
      </>
    );
  };

  return ( enrollNowButton());
}
