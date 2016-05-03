package spring;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

import com.cloudcode.framework.annotation.ModuleConfig;

@Configuration
@PropertySource(name = "web.env", value = "classpath:env.properties")
@Import({   
	com.cloudcode.framework.ProjectConfig.class,	
	com.cloudcode.lottery.ProjectConfig.class,
	com.cloudcode.push.ProjectConfig.class
})
public class WebConfig {
	@Autowired
	ApplicationContext applicationContext;

	@Bean(name="hibernate.packagesToScan")
	List<String> hibernateScanPackages(){
		List<String> packageNames=new ArrayList<String>();
		Map<String,Object> moduleConfigBeans=applicationContext.getBeansWithAnnotation(ModuleConfig.class);
		for(Map.Entry<String, Object> entry : moduleConfigBeans.entrySet()){
			ModuleConfig mc=entry.getValue().getClass().getAnnotation(ModuleConfig.class);
			if(mc.domainPackages()!=null && mc.domainPackages().length>0){
				packageNames.addAll(Arrays.asList(mc.domainPackages()));
			}
		}
		return packageNames;
	}
}
